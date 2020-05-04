const nock = require('nock');

export default async () => {
    nock.disableNetConnect();
}
