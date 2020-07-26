import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }
    getTitleText(): Promise<string> {
        return element(by.tagName('h1')).getText() as Promise<string>;
    }

    getFirstRowId(): Promise<string> {
        return element(by.css('.row td:first-child')).getText() as Promise<string>;
    }

    getFirstRowtext(): Promise<string> {
        return element(by.css('.row td:last.child')).getText() as Promise<string>;
    }

    getAllRows(): Promise<number> {
        return element.all(by.className('row')).count() as Promise<number>;
    }

    getInputSearch(): any {
        return element(by.id('input-search'));
    }

    getInputSearchText(): any {
        return element(by.id('input-search')).getText();
    }

    getButtonSearch():any {
        return element(by.id('button-search'));
    }

    getRadioId(): any {
        return element(by.id('radio-id'));
    }

    getRadioText(): any {
        return element(by.id('radio-text'));
    }

    getResetButton(): any {
        return element(by.id('button-reset'));
    }
}
