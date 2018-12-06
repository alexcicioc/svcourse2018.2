class Score {
    constructor() {
        this.score = 0;
    }

    incrementScore(score) {
        //this.score = this.score + score;
        this.score += score;
        $('#score span').html(this.score);
    }
}