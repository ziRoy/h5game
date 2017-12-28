echo "Start Pack UI"
python ResBake.py ../../raw/ui ../../resource/assets/ui
echo "Start Gen Res Config"
python GenResConfig.py ../../resource/assets/ui ../../resource ../../resource/resource_ui.json
echo "OK"