/* eslint-disable */

import emptyObject from 'fbjs/lib/emptyObject'
import ReactSmartDomComponent from './ReactSmartDomComponent';

const Reconciler = require('react-reconciler');

const {
    createElement,
    setInitialProperties,
    updateProperties,
} = ReactSmartDomComponent;

const RendererHostConfig = {
    appendInitialChild(parentInstance, child) {
        console.log('appendInitialChild', parentInstance, child);
    },

    createInstance(type, props, internalInstanceHandle) {
        const instance = createElement(type, props, rootContainerInstance, hostContext);

        return instance;
    },

    createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
        return text
    },

    finalizeInitialChildren(element, type, props, rootContainerInstance) {
        setInitialProperties(element, type, props, rootContainerInstance);
    },

    getPublicInstance(inst) {
        return inst
    },

    prepareForCommit() {
        // noop
    },

    prepareUpdate(wordElement, type, oldProps, newProps) {
        return true
    },

    resetAfterCommit() {
        // noop
    },

    resetTextContent() {
        // Hardware does not have a text node like DOM
    },

    // If you've such use case where you need to provide data from the root instance,
    // see the below example. This may help you in creating your own custom renderer

    createInstance(type, props, internalInstanceHandle) {
        // 'internalInstanceHandle' is not transparent here. So use host context methods
        // to get data from roots
        return createElement(type, props)
    },

    // Use this current instance to pass data from root
    getRootHostContext(instance) {
        // getHostContextNode here updates the internal state of createElement and stores a ref to current instance
        // return getHostContextNode(instance)
        return 'getRootHostContext';
    },

    getChildHostContext() {
        return emptyObject
    },

    shouldSetTextContent(type, props) {
        // return false // The hardware does not have a text node like DOM
    },

    now: () => { },

    useSyncScheduling: true,

    mutation: {
        appendChild(parentInstance, child) {

        },

        appendChildToContainer(parentInstance, child) {

        },

        removeChild(parentInstance, child) {
            // parentInstance.removeChild(child)
        },

        removeChildFromContainer(parentInstance, child) {
            // parentInstance.removeChild(child)
        },

        insertBefore(parentInstance, child, beforeChild) {
            // noop
        },

        commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
            updateProperties(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
        },

        commitMount(instance, updatePayload, type, oldProps, newProps) {
            // noop
        },

        commitTextUpdate(textInstance, oldText, newText) {

        },
    },
}

const SmartDOMRenderer = Reconciler(RendererHostConfig)

export default SmartDOMRenderer;