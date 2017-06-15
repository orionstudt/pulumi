// *** WARNING: this file was generated by the Lumi IDL Compiler (LUMIDL). ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

/* tslint:disable:ordered-imports variable-name */
import * as lumi from "@lumi/lumi";

import {ARN} from "../types";
import {InlinePolicy} from "./policy";

export class Role extends lumi.NamedResource implements RoleArgs {
    public assumeRolePolicyDocument: any;
    public readonly path?: string;
    public readonly roleName?: string;
    public managedPolicyARNs?: ARN[];
    public policies?: InlinePolicy[];
    public arn: ARN;

    constructor(name: string, args: RoleArgs) {
        super(name);
        if (args.assumeRolePolicyDocument === undefined) {
            throw new Error("Missing required argument 'assumeRolePolicyDocument'");
        }
        this.assumeRolePolicyDocument = args.assumeRolePolicyDocument;
        this.path = args.path;
        this.roleName = args.roleName;
        this.managedPolicyARNs = args.managedPolicyARNs;
        this.policies = args.policies;
    }
}

export interface RoleArgs {
    assumeRolePolicyDocument: any;
    readonly path?: string;
    readonly roleName?: string;
    managedPolicyARNs?: ARN[];
    policies?: InlinePolicy[];
}


