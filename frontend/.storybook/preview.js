import { addDecorator } from "@storybook/react";
import { GlobalStyles } from "../src/styles/GlobalStyles";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

addDecorator((story) => {
	return (
		<>
			<link rel="stylesheet" href="https://use.typekit.net/gaj3nyb.css" />
			<GlobalStyles />
			{story()}
		</>
	);
});
