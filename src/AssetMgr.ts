class AssetMgr{
    /**
     * 初始化
     * @param call_back_
     */
    public static init(call_back_, target_){
        // 下载版本文件
        RES.parseConfig({
            "resources":
                [
                    {"name":this.vres_key,"type":"json","url":"vres.manifest?v=" + Math.floor( Math.random() * 10000000)},
                ],

            "groups":
                [
                    {"name": this.init_group_name,"keys":this.vres_key}
                ]
        }, "resource/" );

        function onInitLoadComplete(event: RES.ResourceEvent){
            if (event.groupName == this.init_group_name) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);

                // 加载版本文件
                this.initVerMap()

                call_back_.call(target_)
            }
        }

        function onInitLoadError(){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);

            console.warn("asset mgr init load error")
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);

        RES.loadGroup(this.init_group_name)
    }

    /**
     * 添加资源
     * @param res_
     */
    public static registerRes(res_){
        var res_list = res_["resources"]
        if(res_list) {
            for(var idx = 0; idx < res_list.length; ++idx) {
                res_list[idx].url = this.appendVer(res_list[idx].url)
            }
        }

        RES.parseConfig(res_, "resource/")
    }

    /**
     * 加载资源
     * @param name_
     * @param call_back_
     */
    public static loadGroup(name_, call_back_, target_, prg_call_back_) {
        function onLoadComplete(event:RES.ResourceEvent) {
            if (event.groupName == name_) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this)
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this)
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this)

                call_back_.call(target_)
            }
        }

        function onLoadError(event:RES.ResourceEvent) {
            if (event.groupName == name_) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this)
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this)
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this)

                console.warn("res group load error: " + name_)
            }
        }

        function onLoadProgress(event:RES.ResourceEvent) {
            if (event.groupName == name_) {
                if (prg_call_back_) {
                    prg_call_back_.call(target_, event)
                }
            }
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this);

        RES.loadGroup(name_)
    }

    public static loadGroupFromJson(key_, url_, group_name_, call_back_, target_, prg_call_back_){
        this.registerRes({
            "resources":[
                {
                    "name": key_,
                    "type":"json",
                    "url": url_
                }
            ]
        })

        function onJsonLoadComplete(data_, data_key_){
            if(data_key_ == key_) {
                this.registerRes(data_)

                this.loadGroup(group_name_, call_back_, target_, prg_call_back_)
            }
        }

        RES.getResAsync(key_, onJsonLoadComplete, this)
    }

	//public static get swfAssetsMgr()
	//{
	//	if ( this.swf_assets_mgr === undefined ) this.swf_assets_mgr = new starlingswf.SwfAssetManager();
	//	return this.swf_assets_mgr;
	//}

    private static init_group_name = "asset_mgr"
    private static vres_key = "vres_manifest"

    private static ver_map = {}
    private static initVerMap(){
        this.ver_map = RES.getRes(this.vres_key)
    }
	//private static swf_assets_mgr;


    private static appendVer(res_path_){
        var ver_data = this.ver_map[res_path_]
        if(ver_data) {
            return res_path_ + "?v=" + ver_data
        }
        else{
            return res_path_ + "?v=" + Math.random();
        }
    }
}

class AssetGroup
{
	public constructor( name:string )
	{
		this.name 	= name;
		this.config = {};
		this.config["resources"] = [];
	}
	public appendRes( name:string, type:string, url:string ):AssetGroup
	{
		this.config["resources"].push( {
			name	:name,
			type	:type,
			url		:url
		} );
		return this;
	}
	//public appendSwf( path:string ):AssetGroup
	//{
	//	if ( path.lastIndexOf( "/" ) != path.length - 1 ) path += "/";
	//	console.log( path + this.name + "/" + this.name + ".json" );
	//	console.log( path + this.name + "/" + this.name + "_swf.json" );
	//	return this
	//		.appendRes( this.name, "sheet", path + this.name + "/" + this.name + ".json" )
	//		.appendRes( this.name + "_swf", "json", path + this.name + "/" + this.name + "_swf.json" );
	//}
	public load( cb:Function, target?:any ):void
	{
		var len = this.config["resources"].length;
		if ( len == 0 )
		{
			cb.call( target );
			return;
		}
		var keys = "";
		for ( var i = 0; i < len; i++ )
		{
			if ( i != 0 ) keys += ",";
			keys += this.config["resources"][i].name;
		}
		this.config["groups"] = [{name:this.name, keys:keys}];

		AssetMgr.registerRes( this.config );
		AssetMgr.loadGroup( this.name, cb, target, null );
	}
	//public loadSwf( cb:Function, target?:any ):void
	//{
	//	this.load( ()=>{
	//		AssetMgr.swfAssetsMgr.addSpriteSheet( this.name, RES.getRes( this.name ) );
	//		cb.call( target );
	//	});
	//}

	private name	:string;
	private config	:Object;
}
