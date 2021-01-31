export class FloodItState {
    __type__: 'state';
    move: number;
    colors: string[];
    board: string[][];

    win_text: string;
    board_size: number;
    color_choices: string[];

    constructor(model?: FloodItState) {
        this.__type__ = 'state';

        if (model) {
            this.move = model.move;
            this.colors = model.colors;
            this.board = [...model.board];
            this.win_text = model.win_text;
            this.board_size = model.board_size;
            this.color_choices = model.color_choices;
        } else {
            this.move = 0;
            this.colors = [];
            this.board = [];
            this.win_text = '';
            this.board_size = 0;
            this.color_choices = [];
        }
    }
}

export class FloodItRequest {
    __type__: string;
    color: number;
    state: FloodItState;
    messages: string[];
    verbose: boolean;

    constructor(verbose: boolean, model?: FloodItRequest) {
        if (model) {
            this.__type__ = model.__type__;
            this.color = model.color;
            this.state = new FloodItState(model.state);
            this.messages = model.messages;
            this.verbose = model.verbose;
        } else {
            this.__type__ = 'req';
            this.color = 0;
            this.state = new FloodItState();
            this.messages = [];
            this.verbose = verbose;
        }
    }
}
