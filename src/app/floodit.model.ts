export class FloodItState {
    '__type__': 'state';
    move: number;
    colors: string[];
    board: string[][];

    win_text: string;
    board_size: number;
    color_choices: string[];

    constructor() {
        this.move = 0;
        this.colors = [];
        this.board = [];
        this.win_text = '';
        this.board_size = 0;
        this.color_choices = [];
    }
}

export class FloodItRequest {
    '__type__': 'req';
    color: number;
    state: FloodItState;

    constructor() {
        this.color = 0;
        this.state = new FloodItState();
    }
}
