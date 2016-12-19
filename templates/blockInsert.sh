#!/bin/bash

#
# Author: John Emmons
# Date: Nov. 25, 2015
#
# Description: running this shell script finds marker blocks embedded in source
# html code (such as <!-- <<<disclaimer.html.eb>>> -->) and replaces them with
# their corresponding html. I did this to make maintaining my static html site
# more DRY and less error prone.
#
# Usage: this script scans for .html and .eb files in the directory it resides
# in. The contents of .eb files will be inserted into the .html files at
# locations marked by blocks of the form.
#
# <!-- <<<example.html.eb>>> -->
#

scriptPath="$(dirname "$(readlink -f "$0")")"
files=$(ls $scriptPath/*.html)
blocks=$(ls $scriptPath/*.html.eb) # .eb = embedded block

for file in ${files[*]}; do
    cp $file $file.tmp

    # replace blocks
    for block in ${blocks[*]}; do 
        blockRegex=$(basename $block)
        sed -i "/<!-- <<<$blockRegex>>> -->/{r $block
:a;n;ba}" $file.tmp

        sed -i "s/<!-- <<<$blockRegex>>> -->//" $file.tmp 
    done 
    
    # replace other patterns
    # <!-- <<<date>>> -->
    date=$(date +'%B %d, %Y')
    sed -i "s/<!-- <<<date>>> -->/$date/" $file.tmp

    mv $file.tmp $(dirname $file)/../$(basename $file)
done

cp $scriptPath/*.txt $scriptPath/..
