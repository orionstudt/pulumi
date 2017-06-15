// *** WARNING: this file was generated by the Lumi IDL Compiler (LUMIDL). ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

/* tslint:disable:ordered-imports variable-name */
import * as lumi from "@lumi/lumi";

import {CannedACL} from "./acl";

export class Bucket extends lumi.NamedResource implements BucketArgs {
    public readonly bucketName?: string;
    public accessControl?: CannedACL;

    constructor(name: string, args?: BucketArgs) {
        super(name);
        if (args !== undefined) {
            this.bucketName = args.bucketName;
            this.accessControl = args.accessControl;
        }
    }
}

export interface BucketArgs {
    readonly bucketName?: string;
    accessControl?: CannedACL;
}


