export default class GameData {
    constructor(username, time) {
        this.username = username;
        this.time = time;
        this.date = new Date().toLocaleDateString();
        this.timeOfDay = new Date().toLocaleTimeString();
    }
}
