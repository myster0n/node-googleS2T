# Google Speech to Text for NodeJS

This is a wrapper for the Google Speech to Text API. It takes locally stored audio files, uploads them to Google and awaits the results. The results come back in JSON format. Made with info gained from [here](https://gist.github.com/alotaiba/1730160) and [here](http://sebastian.germes.in/blog/2011/09/googles-speech-api/).

## Parameters

`path_to_flac` 
Either a string that points to the path of an audio file, or an array of strings. The audio files must be - because of my limited knowledge of what the google speech API will support - in **flac** format @ **16Kbit/s**.

`filterEmpty`
*Boolean* that indicates whether you want the results for audio on which the API fails to deliver.

`opts` 
An *object* used to override or extend the *pathopts* object. Some options are : 
- `lang` : To set the language of the audio. ex : `{lang:'nl-nl'}`
- `maxresults` : Maximum results to return for utterance. ex : `{maxresults:6}`
- `pfilter` : When not set to zero it returns "safe" words ( ### instead of sex). 

`callback`
The callback function.

## Example

```javascript var s2t = require('googleS2T').s2t;
s2t([ '/data/audio/fragment1.flac',
      '/data/audio/fragment2.flac',
      '/data/audio/fragment3.flac'],
  true,
  {lang:'nl-nl'},
  function(err,ret){
    console.log(JSON.stringify(ret, undefined, 2));
  }
);
```

Which results in :

```[
  {
    "status": 0,
    "id": "980dd1ef2d82b1d5ffa6c7e32db6791d-1",
    "hypotheses": [
      {
        "utterance": "maarten tromp tijd voor een klimatologisch overzicht een heel speciale maat met franse erg lage temperatuur gemiddeld temperatuur van 3 kom je een gratis een evenaring van maart 19 87 in elk geval",
        "confidence": 0.62085885
      }
    ]
  },
  {
    "status": 0,
    "id": "ed5866065e84e34f779f969ed8eaada9-1",
    "hypotheses": [
      {
        "utterance": "rockport waar komen op de 22e plaats wat betreft koudste maart maanden oostvoorne",
        "confidence": 0.6058565
      }
    ]
  }
]
```

As you can see, I only have 2 results for 3 audio samples. If you want the full results, just set *filterEmpty* to **false**, which results in this :

```[
  {
    "status": 5,
    "id": "3d2779fe554b647bb52be50c13d10f63-1",
    "hypotheses": []
  },
  {
    "status": 0,
    "id": "980dd1ef2d82b1d5ffa6c7e32db6791d-1",
    "hypotheses": [
      {
        "utterance": "maarten tromp tijd voor een klimatologisch overzicht een heel speciale maat met franse erg lage temperatuur gemiddeld temperatuur van 3 kom je een gratis een evenaring van maart 19 87 in elk geval",
        "confidence": 0.62085885
      }
    ]
  },
  {
    "status": 0,
    "id": "ed5866065e84e34f779f969ed8eaada9-1",
    "hypotheses": [
      {
        "utterance": "rockport waar komen op de 22e plaats wat betreft koudste maart maanden oostvoorne",
        "confidence": 0.6058565
      }
    ]
  }
]
```

As you can see, it was the first audio sample that gave no results. You only have valid results for samples that return with a status at zero.

## Dependencies

This code uses the async library version 0.2.6

## License

Copyright 2013 Myster0n
All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
