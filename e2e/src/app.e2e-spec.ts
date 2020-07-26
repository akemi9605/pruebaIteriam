import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('INFINITE SCROLL EXAMPLE');
  });

  it('should load 400 first images in a table row', () => {
      page.navigateTo();
      expect(page.getAllRows()).toEqual(400);
  });

    describe('When the user select an Id and enters a correct ID in the input', () => {

        beforeEach(() => {
            page.navigateTo();

            const radioId = page.getRadioId();
            const inputSearch = page.getInputSearch();
            const buttonSearch = page.getButtonSearch();

            radioId.click();
            inputSearch.sendKeys('100');
            buttonSearch.click();
        })

        it('Returns just one line with the correct photo element', () => {

            expect(page.getAllRows()).toEqual(1);
            expect(page.getFirstRowId()).toEqual('100');

        });

        describe('When the user clicks reset button', () => {
            it('the input gets empty', () => {
                const buttonReset = page.getResetButton();
                buttonReset.click();

                expect(page.getInputSearchText()).toEqual('')
            });

            it('the input gets empty', () => {
                const buttonReset = page.getResetButton();
                buttonReset.click();

                expect(page.getAllRows()).toEqual(400);
            });
        })

    });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
