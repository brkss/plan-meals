export const imageToBase64 = (file: File, callback: (res: any) => void) => {
    var coolFile = {
        base64: '',
        filetype: '',
        size: 0,
        filename: ''
    };
    function readerOnload(e: any){
      var base64 = btoa(e.target.result);
      coolFile.base64 = base64;
      callback(coolFile)
    };
  
    var reader = new FileReader();
    reader.onload = readerOnload;
  
    var file = file;
    coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);
  } 