import { updateStatus } from '../hardwareDriver/miioController';

const ROOT_KEY = '_ROOT_';

const ReactSmartDomComponent = {
    createElement(tag, props, rootContainerElement/* , hostContext */) {
        return Object.assign({ [ROOT_KEY]: rootContainerElement }, props);
    },

    setInitialProperties(element, tag, rawProps/* , rootContainerElement */) {
        Object.assign(element, rawProps);

        if (tag === 'device') {
            updateStatus(rawProps);
        }
    },

    diffProperties(/* element, tag, lastRawProps , nextRawProps, rootContainerElement */) {

    },

    updateProperties(element, updatePayload, type, oldProps, newProps) {
        Object.assign(element, newProps);

        if (type === 'device') {
            updateStatus(newProps);
        }
    },
};

export default ReactSmartDomComponent;

