export default class Button extends AbstractField {
    static clazz = 'com.adobe.cq.wcm.core.components.models.form.button';

    constructor(content) {
       this.content = content;
    }

    get id(){
        return this.content.id;
    }

    get title(){
        return this.content.title;
    }

    get name() {
        return this.content.name;
    }

    get value() {
        return this.content.value;
    }

    get type() {
        return this.content.type;
    }

    get helpMessage() {
        return this.content.helpMessage;
    }

    get exportedType() {
        return 'core/wcm/components/form/button/v2/button';
    }
}