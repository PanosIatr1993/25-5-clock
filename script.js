class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: "Session",
      timeLeft: 25 * 60,
      start: false,
      timerColor: { color: "white" } };

    this.timerInterval = null;
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
  }

  breakIncrement() {
    if (this.state.breakLength <= 59 && this.state.start == false) {
      this.setState(prevState => ({ breakLength: prevState.breakLength + 1 }));
    }

  }

  breakDecrement() {
    if (this.state.breakLength > 1 && this.state.start == false) {
      this.setState(prevState => ({ breakLength: prevState.breakLength - 1 }));
    }
  }

  sessionIncrement() {
    if (this.state.sessionLength <= 59 && this.state.start == false) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength + 1,
        timeLeft: (this.state.sessionLength + 1) * 60 }));

    }
  }

  sessionDecrement() {
    if (this.state.sessionLength > 1 && this.state.start == false) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength - 1,
        timeLeft: (this.state.sessionLength - 1) * 60 }));

    }
  }

  startStop() {
    if (this.state.start) {
      clearInterval(this.timerInterval);
    } else {
      this.timerInterval = setInterval(this.updateTimer, 1000);
    }
    this.setState(prevState => ({
      start: !prevState.start }));

  }

  updateTimer() {
    if (this.state.timeLeft === 0) {
      document.getElementById('beep').play();
      if (this.state.timerType === "Session") {
        this.setState({
          timerType: "Break",
          timeLeft: this.state.breakLength * 60 });

      } else {
        this.reset();
      }
    } else {
      if (this.state.timerType == "Break") {
        this.setState({ timerColor: { color: "red" } });
      }
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1 }));

    }
  }

  reset() {
    clearInterval(this.timerInterval);
    const audioElement = document.getElementById('beep');
    audioElement.pause();
    audioElement.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: "Session",
      timeLeft: 25 * 60,
      start: false,
      timerColor: { color: "white" } });

  }

  render() {
    {/*Format Display Time in 00:00 Format*/}
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { style: { color: "white", fontFamily: "Times New Roman", fontSize: 60 } }, "Pomodoro Timer", /*#__PURE__*/React.createElement("br", null), "(25 + 5 Clock)"), /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/


      React.createElement("div", { id: "break-label", className: "col-xs-6 col-md-6" },
      "Break Length", /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-xs-3 col-md-3" }), /*#__PURE__*/
      React.createElement("div", { id: "break-space", className: "col-xs-6 col-md-6" }, /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.breakDecrement }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-down" })), /*#__PURE__*/

      React.createElement("div", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.breakIncrement }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-up" }))), /*#__PURE__*/


      React.createElement("div", { className: "col-xs-3 col-md-3" }))), /*#__PURE__*/




      React.createElement("div", { id: "session-label", className: "col-xs-6 col-md-6" },
      "Session Length", /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-xs-3 col-md-3" }), /*#__PURE__*/
      React.createElement("div", { id: "session-space", className: "col-xs-6 col-md-6" }, /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.sessionDecrement }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-down" })), /*#__PURE__*/

      React.createElement("div", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.sessionIncrement }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-up" }))), /*#__PURE__*/


      React.createElement("div", { className: "col-xs-3 col-md-3" }))), /*#__PURE__*/




      React.createElement("div", { id: "timer-label", className: "text-center" },
      this.state.timerType, /*#__PURE__*/
      React.createElement("div", { id: "time-left", style: this.state.timerColor },
      formattedTime)), /*#__PURE__*/




      React.createElement("div", { id: "timer-control" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.startStop }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-play fa-2x" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-pause fa-2x" })), /*#__PURE__*/

      React.createElement("audio", { id: "beep", src: "https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" }), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.reset }, /*#__PURE__*/React.createElement("i", { class: "fa fa-refresh fa-2x" }))), /*#__PURE__*/


      React.createElement("div", { id: "credit" }, /*#__PURE__*/React.createElement("span", { style: { fontFamily: "monospace" } }, "Designed and Coded by "), /*#__PURE__*/React.createElement("span", { style: { fontFamily: "monospace", color: "#1A1C1E" } }, " Panagiotis Iatridis")))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(PomodoroTimer, null), document.getElementById("timer"));