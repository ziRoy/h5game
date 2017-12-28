"""
Usage:
    GenResConfig {RES_FOLDER} {RES_ROOT} {OUT_FILE}
"""

import os
import re
import sys
import json
from xml.etree import ElementTree

"""
    Generate map with image info from folder
"""
def ParseFolder(img_folder_, img_root_path_, skip_name_):
    content = {}
    keys_str = ""
    content["groups"] = [{"keys":"", "name":"uires"}]
    content["resources"] = []
    for (dirpath, dirnames, filenames) in os.walk(img_folder_):
        for filename in filenames:
            if filename != skip_name_:
                if (filename.startswith('.')):
                    continue
                if filename.endswith('.json'):
                    res_data = {}
                    res_name = os.path.basename(filename)
                    res_name = res_name.replace('.', '_')
                    res_name = res_name.replace('-', '_')
                    res_name = res_name.replace(' ', '_')
                    res_data["name"] = res_name.lower()
                    res_data["type"] = "sheet"
                    res_data["url"] = os.path.relpath(os.path.join(dirpath, filename), img_root_path_).replace("\\","/")
                    json_keys_str = ""

                    opened_file = open(os.path.join(dirpath, filename))
                    json_object = json.load(opened_file)
                    frames = json_object["frames"]
                    for frame in frames:
                        if json_keys_str == "":
                            json_keys_str += frame
                        else:
                            json_keys_str += ","
                            json_keys_str += frame
                    opened_file.close()
                    
                    res_data["subkeys"] = json_keys_str

                    content["resources"].append(res_data)

                    if keys_str == "":
                        keys_str += res_data["name"]
                    else:
                        keys_str += ","
                        keys_str += res_data["name"]
                else:
                    res_data = {}
                    res_name = os.path.basename(filename)
                    res_name = res_name.replace('.', '_')
                    res_name = res_name.replace('-', '_')
                    res_name = res_name.replace(' ', '_')
                    res_data["name"] = res_name.lower()
                    res_data["name"].replace('\.', '_')
                    res_data["type"] = "image"
                    res_data["url"] = os.path.relpath(os.path.join(dirpath, filename), img_root_path_).replace("\\","/")

                    content["resources"].append(res_data)

                    if keys_str == "":
                        keys_str += res_data["name"]
                    else:
                        keys_str += ","
                        keys_str += res_data["name"]

    content["groups"][0]["keys"] = keys_str
                            
    return content

"""
    Write map of image info to js file
"""
def WriteImgDB(content_, out_path_):
    with open(out_path_, 'w') as out_file:
        out_file.write(json.dumps(content_))        

pic_path = sys.argv[1]
root_path = sys.argv[2]
js_path = sys.argv[3]
content_folder = ParseFolder(pic_path, root_path, os.path.basename(js_path))
WriteImgDB(content_folder, js_path)
print '-------------------------- Success ----------------------------'
