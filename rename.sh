#!/bin/sh

for i in $(find ./src/weui | grep wxss)
do
    mv $i $(echo $i | sed 's/\.wxss/\.less/')
done

