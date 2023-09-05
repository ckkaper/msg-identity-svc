import cryptoRandomStringAsync from "crypto-random-string";

export const generateAuthorizationCode = async () => {

    // TODO: get length and options from the config instead of them being hard coded.
    return await cryptoRandomStringAsync({length: 20, type: 'url-safe'});
}