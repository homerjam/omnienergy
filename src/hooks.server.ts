import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { baseLocale, type Locale } from '$lib/paraglide/runtime';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		event.locals.baseLocale = baseLocale;
		event.locals.locale = (locale ||
			event.url.searchParams.get('locale') ||
			event.cookies.get('locale')) as Locale;

		// event.cookies.set('locale', event.locals.locale, {
		// 	path: '/',
		// 	httpOnly: false,
		// 	secure: false,
		// 	sameSite: 'lax',
		// });

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', event.locals.locale),
		});
	});

export const handle: Handle = handleParaglide;
