function removeStyles (htmlString){
    return htmlString.replace(/\sstyle="(.|\n)*?"/gi, "")
}