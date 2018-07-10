class Fieldvalidation {

   
    number(num){
       if(num !== undefined && num > 0) {
           return true;
       }
       return false;
    }
    text(txt){
        if(txt !== undefined && txt.length > 0){
            return true;
        }
        return false;

    }


}

const validData = new Fieldvalidation();
export default validData ;