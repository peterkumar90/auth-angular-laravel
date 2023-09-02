<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    //
    protected $fillable=[
        'user_id',
        'doc_title',
        'doc_file',
        'doc_description'
    ];
    
}
