import React, { Component } from 'react'
import { bind, debounce } from 'decko'
import { watch, unwatch, callWatchers } from 'melanke-watchjs'

const CTX = {};

async function load(name) {
    if (!CTX[name]) {
        const res = await import(`context/${name}`);

        CTX[name] = res.default;
    }

    return CTX[name];
}

/**
 * Provide context data to decorated component
 *
 * @param  {String|Array} names – ctx name(s)
 *
 * @return {ReactComponent} decorated component
 *
 * @example:
 * // one ctx
 * @withContext('user')
 *
 * // one ctx (only specifyed fields)
 * @withContext({
 *     name: 'user',
 *     fields: 'isLogged'
 * })
 *
 * // several ctx's
 * @withContext(['user', 'page'])
 * @withContext([
 *     {
 *         name: 'user',
 *         fields: 'isLogged'
 *     },
 *     {
 *         name: 'page',
 *         fields: ['title', 'layout']
 *     },
 *     'someAnotherCtx'
 * ])
 */
const withContext = ctx => WrappedComponent => {
    if (!ctx) {
        throw new Error('Context name not specifyed.');
    }

    if (typeof ctx === 'string' || typeof ctx === 'object') {
        ctx = [ctx];
    }

    return class extends Component {
        constructor(props) {
            super(props);
            this.ctx = {};
        }

        componentDidMount() {
            this.watch();
        }

        componentWillUnmount() {
            this.unwatch();
        }

        forCtx(cb) {
            ctx.forEach(item => {
                if (typeof item === 'string') {
                    cb(item);
                }
                if (typeof item === 'object') {
                    cb(item.name, item.fields);
                }
            });
        }

        load(name) {
            return load(name)
                .then(obj => {
                    this.ctx[name] = obj;
                    this.update();
                    return obj
                })
                .catch(err => {
                    console.error(`Failed to load context "${name}"`);
                });
        }

        @bind
        watch() {
            this.forCtx((name, fields) => this.load(name).then(obj => {
                fields
                    ? watch(obj, fields, this.update)
                    : watch(obj, this.update);
            }));
        }

        @bind
        unwatch() {
            this.forCtx((name, fields) => {
                fields
                    ? unwatch(this.ctx[name], fields, this.update)
                    : unwatch(this.ctx[name], this.update);
            });
        }

        @bind
        @debounce(5)
        update() {
            this.forceUpdate();
        }

        render() {
            console.log('render')
            return <WrappedComponent {...this.props} {...this.ctx} />
        }
    }
}

export default withContext
