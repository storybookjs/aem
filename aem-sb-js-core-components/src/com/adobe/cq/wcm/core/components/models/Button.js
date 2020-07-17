export default class Button {
    static clazz = 'com.adobe.cq.wcm.core.components.models.Button';
    
    constructor(content) {
       this.content = content;
    }

    get text(){
        return this.content.text;
    }

    get icon(){
        return this.content.icon;
    }

    get link() {
        return this.content.link;
    }

    get data() {
        return {};
    }

    get exportedType() {
        return 'wcm/core/components/button/v1/button';
    }
}