import React from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImgNotFound from './imgNotFound/image-not-found.png'
import ImageGallery from 'react-image-gallery';
 
class Gallery extends React.Component {
 
  render() {
 
    const images = [
      {
        original: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg',
        thumbnail: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg',
      },
      {
        original: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg',
        thumbnail: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg'
      },
      {
        original: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg',
        thumbnail: 'https://pictures.dealer.com/r/rickhendrickchevroletofbuford/0442/ecf75a524b8bcfe6406e98f9871b9db8x.jpg'
      }
    ]
 
    return (
      <ImageGallery 
        items={this.props.images.map(image => Object.assign({}, {original: image || ImgNotFound, thumbnail: image || ImgNotFound})) || images}
        thumbnailPosition="left"
        showBullets={true}
        showIndex={true}
        showFullscreenButton={false}
        showPlayButton={false}
      />
      
    );
  }
 
}

export default Gallery;