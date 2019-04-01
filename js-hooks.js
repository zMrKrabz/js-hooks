const request = require('request-promise');

class hook {

	// takes in webhook and content
	constructor(webhook, content='') {
		this.webhook = webhook;

		this.webhookForm = {
			content: content,
			embeds: []
		};
	};

	// input name and value and outputs a new form
	fieldForm(name, value, inline=true) {
		let form = {
			name: name,
			value: value,
			inline: inline
		};

		return form;
	};

	embedForm() {
		let form = {
			author: {
				name: '',
				url: '',
				icon_url: '',
			},
	
			title: '',
			url: '',
			color: 15258703,
			fields: [],
	
			thumbnail: {
				url: ''
			},
	
			image: {
				url: ''
			},
	
			footer: {
				text: '',
				icon_url: ''
			}
		};
	
		return form;
	};

	newEmbed(embed) {
		this.webhookForm.embeds.push(embed);
	};

	// specify the position of the embed and adds a field to it
	newField(embed, field) {
		this.webhookForm.embeds[embed].fields.push(field);
	};

	// sends the request to webhook with the content
	async sendWebhookContent(){
		let options = {
			method: 'POST',
			uri: this.webhook,
			headers: {
				'Content-Type': 'application/json'
			},
			body: this.webhookForm,
			json: true
		};

		// sends request and gets the status code
		let response = await new Promise(resolve => {
			request(options, (e, r) => {
				resolve(r.statusCode);
			});
		});

		return response;
	};
};

module.exports = {hook};