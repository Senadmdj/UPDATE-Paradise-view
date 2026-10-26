"use strict";
const http=require("node:http");
const fs=require("node:fs");
const path=require("node:path");
const root=__dirname;
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);}catch{res.writeHead(400);return res.end("Bad request");}
  if(pathname==="/")pathname="/index.html";
  const target=path.resolve(root,"."+pathname);
  if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);return res.end("Forbidden");}
  fs.readFile(target,(err,data)=>{
    if(err){res.writeHead(err.code==="ENOENT"?404:500,{"Content-Type":"text/plain; charset=utf-8"});return res.end(err.code==="ENOENT"?"Not found":"Server error");}
    res.writeHead(200,{"Content-Type":types[path.extname(target).toLowerCase()]||"application/octet-stream","X-Content-Type-Options":"nosniff","Cache-Control":"no-cache"});
    res.end(data);
  });
}).listen(4173,"127.0.0.1",()=>console.log("Paradise View Pro preview: http://127.0.0.1:4173/"));
