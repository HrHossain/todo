class Todo{
    constructor(id,text){
        this.id = id;
        this.text = text;
        this.completed = false;
        this.createAt = new Date()
    }
    getFormattedDate(){
        const options={
            year:'numeric',
            month:'short',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        }
        return this.createAt.toLocaleString('en-US',options)
    }
}