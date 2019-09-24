import { configure } from '@storybook/react';
import React from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-router'
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import { translationMessages, appLocales, DEFAULT_LOCALE } from '../app/i18n.js';
import Container from './Container'
Object.values = (obj) => Object.keys(obj).map(key => obj[key]);
addDecorator(withKnobs);

addDecorator(withSmartKnobs);

addDecorator(StoryRouter());

addLocaleData(enLocaleData)
const getMessages = locale => translationMessages[locale]
setIntlConfig({locales:appLocales, defaultLocale: DEFAULT_LOCALE, getMessages})

addDecorator(withIntl)

addDecorator(story => <Container story={story} />);

// automatically import all files ending in *.stories.js
function requireAll(requireContext) {
  return requireContext.keys().map(key => {
  	return requireContext
  });
}

function loadStories() {
	const req = require.context('../app/components/', true, /^.*\.stories$/)
	return requireAll(req)
  // requireAll();
}
configure(loadStories(), module);