var edgePx;

(function( $ ) {
  $.fn.opticalSpace = function( edgePx )
  {
    this.each( function() {
      
      var words =  $( this ).text().replace(/^\s+/,"").split( " " );
      var wordSpaced = "";
    
    
      for( var w = 0; w < words.length; w++ )
      {
        var textMetrics = getTextHeight( words[w].toUpperCase(), $( this ) );
      
        dynamicContext = $( '<canvas />' ).attr("width", textMetrics.width).attr( "height", textMetrics.height )[0].getContext('2d');
      
        var letters = words[w].split("");
      
        var whiteSpaces = [];
      
        for( var n = 0; n < letters.length-1; n++ )
        {
          whiteSpaces.push( measureLetters( letters[n].toUpperCase(), letters[n+1].toUpperCase(), $(this), edgePx ) );  
        }
        
        var maxWhiteSpace = Math.max.apply(null, whiteSpaces);
        
        for( var i = 0; i < letters.length-1; i++ )
        {
          var letter = letters[ i ].toUpperCase();
          
          var letterWhiteSpaceDifference = maxWhiteSpace - whiteSpaces[i];
          var letterWhiteSpacePadding = letterWhiteSpaceDifference / textMetrics.height;
                  
          var replacementLetter = ( letter == " " ) ? letter : "<span style='display: inline-block; padding-right: " + letterWhiteSpacePadding + "px;'>" + letter + "</span>";
          
          letters[ i ] = replacementLetter;
        }
        
        wordSpaced += letters.join("") + " ";
      }
      
      $( this ).html( wordSpaced );
      
    } );
  }
})( jQuery );



function measureLetters( firstLetter, secondLetter, div, edgePx )
{
  dynamicContext.font = div.css( "font-weight" ) + " " + div.css( "font-size" ) + " " + div.css("font-family");
  
  var firstWidth = dynamicContext.measureText( firstLetter ).width;
  
  dynamicContext.textBaseline = "top";
  dynamicContext.fillStyle = "rgb(0,0,0)"; 
  dynamicContext.fillText( firstLetter + secondLetter, 0, 0 );
    
  var totalPixels = dynamicContext.getImageData( firstWidth - edgePx, 0, edgePx*2, getTextHeight( firstLetter + secondLetter, div ).height );
  
  return( captureNegativeTotal( totalPixels.data ) );
}

function getTextHeight(text, div)
{
  $( "body" ).append("<div class='control'></div>");
  
  var control = $( ".control" ).last();
  
  control.css(
    {
      "color": "#FFF",
      "background-color": "#000",
      "margin": "0",
      "padding": "0",
      "display": "none",
      "font-size":div.css( "font-size" ), 
      "font-family":div.css("font-family"),
      "font-weight":div.css("font-weight")
    }
  );
  
  control.text( text );
  
  var controlHeight = control.innerHeight();
  var controlWidth = control.innerWidth();
  
  control.remove();
  
  return { height: controlHeight, width: controlWidth };
}

function captureNegativeTotal( data )
{
  var negCount = 0;
  
  for( var i = 0; i < data.length; i++ )
  {
    if( data[ i ] == 0 )
    {
      negCount++;
    }
  }
  
  return negCount;
}