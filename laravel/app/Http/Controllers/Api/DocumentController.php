<?php

namespace App\Http\Controllers\Api;

use App\Document;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    //
    public function list(Request $request)
    {
        $user_id=auth()->guard('api')->user()->id;
        $documents=Document::where('user_id',$user_id)->get();
        return response()->json($documents);
    }
    public function show(Request $request){
        $id=$request->id;
        $document=Document::where('id',$id)->first();
        return response()->json($document);
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'doc_title' => 'required',
            'doc_description' => 'required',
            'doc_file'=>'required|mimes:pdf'
        ]);
        $user_id=auth()->guard('api')->user()->id;
        $file = $request->file('doc_file');
        $fileName = time().'.'.$file->extension();
        $filepath = public_path(). '/files';

        $file->move($filepath, $fileName);
        $uploadedfilepath=asset('files').'/'.$fileName;
        Document::create([
            'user_id'=>$user_id,
            'doc_title'=>$request->doc_title,
            'doc_description'=>$request->doc_description,
            'doc_file'=>$uploadedfilepath
        ]);
        return response()->json(['success'=>'Document Uploaded Successfully']);
    }
}
