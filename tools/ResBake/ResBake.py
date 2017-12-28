'''
Command line:
	ResBake.py {SRC_DIR} {DEST_DIR}
'''

import json
import sys
import os
import subprocess
import distutils.core
import shutil

# retrieve image files under directory
def GetImageUnderDir(dir_path_):
	fl = []
	for(dirpath, dirnames, filenames) in os.walk(dir_path_):
		for filename in filenames:
			if filename.endswith(".png") or filename.endswith(".jpg"):
				fl.append(os.path.join(dir_path_, filename))
			
	return fl

def GetTexturePackerPath():
	if(os.name == 'posix'):
		return '/usr/local/bin/TexturePacker'
	else:
		return 'TexturePacker.exe'

def GetPngQuantPath():
    if(os.name == 'posix'):
        return './pngquant'
    else:
        return 'pngquant.exe'

def DoPngQuant(image_path_):
    command = [GetPngQuantPath()]
    command.append('-f')
    command.append('-o')
    command.append(image_path_)
    command.append(image_path_)

    subprocess.check_output(command)

# pack a directory
def PackDir(dir_path_):
    plist_name = dir_path_ + ".json"
    image_name = dir_path_ + ".png"

    file_list = GetImageUnderDir(dir_path_)

    command = [GetTexturePackerPath()]
    command.append('--data')
    command.append(plist_name)
    command.append('--format')
    command.append('egret-spritesheet')
    command.append('--sheet')
    command.append(image_name)
    command.append('--max-size')
    command.append('1024')
    command.append('--smart-update')
    command.extend(file_list)
    subprocess.check_output(command)
    DoPngQuant(image_name)
    RemoveDirOrFile(dir_path_)

def BakeDir(dir_path_):
    for(dirpath, dirnames, filenames) in os.walk(dir_path_):
        for dirname in dirnames:
            dir_full_name = os.path.join(dirpath, dirname)
            PackDir(dir_full_name)

def CopyDirContent(src_dir_, dest_dir_):
	distutils.dir_util.copy_tree(src_dir_, dest_dir_)

def RemoveDirOrFile(path_):
	if(os.path.exists(path_)):
		if(os.path.isfile(path_)):
			os.remove(path_)
		else:
			shutil.rmtree(path_)

def RemoveDirContent(src_dir_, dest_dir_):
	for(dirpath, dirnames, filenames) in os.walk(src_dir_):
		for dirname in dirnames:
			dir_to_remove = os.path.join(dest_dir_, dirname)
			RemoveDirOrFile(dir_to_remove)
		for filename in filenames:
			file_to_remove = os.path.join(dest_dir_, filename)
			RemoveDirOrFile(file_to_remove)
		break

def main():
	if(len(sys.argv) != 3):		
		print 'Error command line arguments'
	
	src_dir = sys.argv[1]
	dest_dir = sys.argv[2]
	
	RemoveDirContent(src_dir, dest_dir)
	CopyDirContent(src_dir, dest_dir)
	BakeDir(dest_dir)

	print '-------------------------- Success ----------------------------'
main()