function removeStyles (htmlString){
    return htmlString.replace(/\sstyle="(.|\n)*?"/gi, "")
}

function removeClasses (htmlString){
    return htmlString.replace(/\sclass="(.|\n)*?"/gi, "")
}