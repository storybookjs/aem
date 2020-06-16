export default class Text {
    static clazz = 'com.adobe.cq.wcm.core.components.models.form.Text';

    constructor(content) {
       this.content = content;
    }

    get id(){
        return this.content.id;
    }

    get title(){
        return this.content.title;
    }

    get value() {
        return this.content.value;
    }

    get type() {
        return this.content.type ? this.content.type : 'text';
    }

    get placeholder() {
        return this.content.placeholder ? this.content.placeholder : '';
    }

    get usePlaceholder() {
        return this.content.usePlaceholder ? this.content.usePlaceholder : false;
    }

    get rows() {
        return this.content.rows ? this.content.rows : 2;
    }

    get readOnly() {
        return this.content.readOnly ? this.content.readOnly : false;
    }

    get required() {
        return this.content.required ? this.content.required : false;
    }

    get requiredMessage() {
        return this.content.requiredMessage ? this.content.requiredMessage : '';
    }

    get constraintMessage() {
        return this.content.constraintMessage ? this.content.constraintMessage : '';
    }

    get helpMessage() {
        return this.content.helpMessage ? this.content.helpMessage : '';
    }

    get IDPrefix(){
        return 'form-text'
    }

    get defaultTitle() {
        return 'Text input field'
    }

    get defaultValue() {
        return ''
    }

    get exportedType() {
        return 'core/wcm/components/form/text/v2/text';
    }
}