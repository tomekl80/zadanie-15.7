'use strict';

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			} 
		};
		this.running = false;	
	}
	
	reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format(times) {
		return `${pad0(times.minutes)} : ${pad0(times.seconds)} : ${pad0(Math.floor(times.miliseconds))}`;
	
		function pad0(value) {
	    	let result = value.toString();
	    	if (result.length < 2) {
	        	result = '0' + result;
	    	}
	    	return result;
		}
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.running) return;
		this.calculate();
	}

	calculate() {
		const times = Object.assign({}, this.state.times);
		times.miliseconds += 1;
		if (times.miliseconds >= 100) {
			times.seconds += 1;
			times.miliseconds = 0;
		}
		if (times.seconds >= 60) {
			times.minutes += 1;
			times.seconds = 0;
		}
		this.setState({times});
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	render() {
		return (
			<div className='container'>
				<nav>
					<button onClick={this.start.bind(this)}>Start</button>
					<button onClick={this.stop.bind(this)}>Stop</button>
					<button onClick={this.reset.bind(this)}>Reset</button>
				</nav>
				{this.format(this.state.times)}
			</div>
		)
	}

}

const app = document.getElementById('app')
ReactDOM.render(<Stopwatch />, app);