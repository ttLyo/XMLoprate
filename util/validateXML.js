function validateXML(xmlContent)
{
    //errorCode 0是xml正确，1是xml错误，2是无法验证
    var xmlDoc,errorMessage,errorCode = 0;
    // code for IE
    if (window.ActiveXObject)
    {
        xmlDoc  = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(xmlContent);

        if(xmlDoc.parseError.errorCode!=0)
        {
            errorMessage="错误code: " + xmlDoc.parseError.errorCode + "\n";
            errorMessage=errorMessage+"错误原因: " + xmlDoc.parseError.reason;
            errorMessage=errorMessage+"错误位置: " + xmlDoc.parseError.line;
            errorCode = 1;
        }
        else
        {
            errorMessage = "格式正确";
        }
    }
    // code for Mozilla, Firefox, Opera, chrome, safari,etc.
    else if (document.implementation.createDocument)
    {
        var parser=new DOMParser();
        xmlDoc = parser.parseFromString(xmlContent,"text/xml");
        var error = xmlDoc.getElementsByTagName("parsererror");
        if (error.length > 0)
        {
            if(xmlDoc.documentElement.nodeName=="parsererror"){
                errorCode = 1;
                errorMessage = xmlDoc.documentElement.childNodes[0].nodeValue;
            } else {
                errorCode = 1;
                errorMessage = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML;
            }
        }
        else
        {
            errorMessage = "格式正确";
        }
    }
    else
    {
        errorCode = 2;
        errorMessage = "浏览器不支持验证，无法验证xml正确性";
    }
    return {
        "msg":errorMessage,
        "error_code":errorCode
    };
}
module.exports = validateXML