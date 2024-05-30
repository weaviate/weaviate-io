import React, { Component } from 'react';

class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      texts: [
        'build and scale AI applications',
        'create amazing websites',
        'design beautiful graphics',
      ],
      textIndex: 0,
      speed: 70,
      isTyping: true,
    };
    this.typingInterval = null;
  }

  componentDidMount() {
    this.startTypewriter();
  }

  componentWillUnmount() {
    clearInterval(this.typingInterval); // Clear the interval when the component unmounts
  }

  startTypewriter = () => {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    this.typingInterval = setInterval(this.typeWriter, this.state.speed);
  };

  typeWriter = () => {
    const { i, texts, textIndex, isTyping } = this.state;

    if (isTyping) {
      if (i < texts[textIndex].length) {
        this.setState((prevState) => ({
          i: prevState.i + 1,
        }));
      } else {
        // Pause for a moment before backspacing
        setTimeout(() => {
          if (this.typingInterval) {
            // Check if the component is still mounted
            this.setState({
              isTyping: false,
            });
            this.startTypewriter();
          }
        }, 1000); // Adjust the pause duration as needed
      }
    } else {
      if (i > 0) {
        this.setState((prevState) => ({
          i: prevState.i - 1,
        }));
      } else {
        if (this.typingInterval) {
          // Check if the component is still mounted
          this.setState((prevState) => ({
            isTyping: true,
            textIndex: (prevState.textIndex + 1) % texts.length,
          }));
          this.startTypewriter();
        }
      }
    }
  };

  render() {
    const { texts, textIndex, i } = this.state;

    return <span>The easiest way to {texts[textIndex].substring(0, i)}</span>;
  }
}

export default Typewriter;
