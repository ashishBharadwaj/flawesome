#!/bin/bash

# smooth-drop-shadow.sh
# Copies images, adding a smooth drop shadow, with enlargement to accommodate. Requires GIMP.
# Author: Paul Taylor @bao7uo

# Wildcard filenames MUST be specified in double quotes

SCRIPT_NAME="report-drop-shadow"

GIMP_VERSION=$(echo $(gimp-console --version) | grep -oP "(?<=version )\d+\.\d+")
GIMP_SCRIPT="$HOME/.gimp-$GIMP_VERSION/scripts/$SCRIPT_NAME.scm"

function gimp-script-create {
cat <<-EOF > "$GIMP_SCRIPT"
	;
	; $SCRIPT_NAME.scm
	; Copies an image with a drop shadow
	; Author: Paul Taylor @bao7uo
	;
	; $GIMP_SCRIPT
	;
	(define ($SCRIPT_NAME infile outfile offsetx offsety radius opacity allowresizing)
	  (let*
	    (
	      (image (car (gimp-file-load RUN-NONINTERACTIVE infile infile)))
	      (drawable (car (gimp-image-get-active-layer image)))
	    )
	    (script-fu-drop-shadow image drawable offsetx offsety radius '(0 0 0) opacity allowresizing)
	    (set! drawable (car (gimp-image-merge-visible-layers image TRUE)))
	    (gimp-file-save RUN-NONINTERACTIVE image drawable outfile outfile)
	    (gimp-image-delete image)
	  )
	)
EOF
}

function gimp_run_script {
  gimp-console -b "($SCRIPT_NAME \"$1\" \"$2\" 0 0 30 60 TRUE)" -b "(gimp-quit 0)";
}

function gimp_script_rename_wrapper {
  TEMP_SUFFIX="-ds-temp-name.png"
  TEMP_NAME="$1$TEMP_SUFFIX"
  gimp_run_script "$1" "$TEMP_NAME"
  rename -- ".png$TEMP_SUFFIX" "-ds.png" "$TEMP_NAME"
}

if [ ! -f "$GIMP_SCRIPT" ]; then
  gimp-script-create
fi

for i in $1; do
  gimp_script_rename_wrapper "$i"
done