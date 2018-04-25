#!/usr/bin/env node

import url from "url";
import * as yargs from "yargs";
import http from "http";
import http_proxy from "http-proxy";
import { read } from "./read";

interface IRouteRule {
    SourceProtocol: string;
    SourceHostName: string;
    SourcePort: string;
    SourcePath: string;
    DestProtocol: string;
    DestHostName: string;
    DestPort: string;
    DestPath: string;
}

(async () => {

    const argv = yargs.argv;

    if (argv.port == undefined) {
        throw new Error("[CLI] --port missing");
    }
    
    if (argv.host == undefined) {
        throw new Error("[CLI] --host missing");
    }
    

    // recv_url_parent:dest_url
    // 127.0.0.1:8080/api/v1 -> 127.0.0.1:8081/api/v2
    
    const routing_rules = await read()
    const routing_dict: { [key: string]: IRouteRule } = {}

    for (let i = 0; i < routing_rules.length; i++) {
       
        const rule = routing_rules[i].replace(" ", "").split("->");
        
        if (rule.length !== 2) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': splitting returned unexpected pattern");
        }

        const source = url.parse(rule[0]);

        if (source.protocol == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': source protocol not specified");
        }

        if (source.hostname == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': source hostname not specified");
        }

        if (source.path == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': source path not specified");
        }

        if (source.port == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': source port not specified");
        }

        const destination = url.parse(rule[1]);

        if (destination.protocol == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': destination protocol not specified");
        }

        if (destination.hostname == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': destination hostname not specified");
        }

        if (destination.path == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': destination path not specified");
        }

        if (destination.port == undefined) {
            throw new Error("[Rule Linter] Error Parsing Rule '" + routing_rules[i] + "': destination port not specified");
        }

        routing_dict[rule[0]] = {
            DestProtocol: destination.protocol as string,
            DestHostName: destination.hostname as string,
            DestPath: destination.path as string,
            DestPort: destination.port as string,
            SourceProtocol: source.protocol as string,
            SourceHostName: source.hostname as string,
            SourcePath: source.path as string,
            SourcePort: source.port as string,
        }
    }

    const lookup_base = "http://" + argv.host + ":" + argv.port;
    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {



    });
})();
