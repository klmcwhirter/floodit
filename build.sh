#!/bin/bash

function echocmd
{
    echo $*
    $*
}

function makeConfigMap
{
    namespace=$1
    configMapName=$2
    dir=$3

    echocmd pushd ${dir}

    files=""
    for f in $(find . -type f -print)
    do
        files="${files} --from-file=$f"
    done

    # namespace was deleted earlier
    # echocmd kubectl delete -n ${namespace} configmap ${configMapName}

    echocmd kubectl create -n ${namespace} configmap ${configMapName} ${files}

    echocmd popd
}

echocmd kubectl delete -f k8s/namespace.yml &

echocmd npm run build

echocmd kubectl apply -f k8s/namespace.yml

echocmd makeConfigMap floodit floodit-artifacts dist/floodit

echocmd rm -fr build
echocmd mkdir -p build/etc/nginx

# copy default config
echocmd docker run -d --name nginx nginx:alpine
echocmd docker cp nginx:/etc/nginx build/etc
echocmd docker stop nginx && docker rm -v nginx

# overwrite with local config
echocmd rm -fr build/etc/nginx/conf.d
echocmd cp -r etc build

echocmd makeConfigMap floodit floodit-nginx-config build/etc/nginx

# clean up
echocmd rm -fr build
echocmd rm -fr dist

echocmd kubectl apply -f k8s/deployment.yml

echocmd kubectl apply -f k8s/ingress.yml
