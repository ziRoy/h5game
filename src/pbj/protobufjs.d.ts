/**
 * Created by yinqing on 15-4-23.
 */

declare module ProtoBuf {
	export function loadProtoFile(filePath: string, callback: ( err:Error, builder:any ) => void): any;
}

declare module "protobufjs" {
	export = ProtoBuf;
}