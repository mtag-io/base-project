import _ from 'lodash';
import Color from 'color';

export const ripple = ({theme, e, addComponents}) => {
    const defaultBgColors = {};
    const rbc = theme('colors', defaultBgColors);
    const rippleBgColors = Object.keys(rbc).reduce((acc, k) => {
        if (['primary', 'secondary', 'error', 'success'].includes(k)) {
            if (rbc[k].default)
                acc[k] = rbc[k].default
            else acc[k] = rbc[k]
        }
        return acc
    }, {})
    const defaultDarkenValue = 0.2;
    let darkenValue = theme('ripple.darken', defaultDarkenValue);
    if (isNaN(darkenValue) || darkenValue > 1 || darkenValue < 0) {
        darkenValue = defaultDarkenValue;
    }

    const returnColorPair = ([modifier, value]) => [
        `${modifier}`,
        {
            backgroundColor: value,
            backgroundPosition: 'center',
            transition: 'background 2s',
            '&:hover': {
                background: `${Color(value)
                    .darken(darkenValue)
                    .hex()
                    .toString()} radial-gradient(circle, transparent 1%, ${Color(value)
                    .darken(darkenValue)
                    .hex()
                    .toString()} 1%) center/15000%`,
            },
            '&:active': {
                backgroundColor: Color(value)
                    .lighten(darkenValue)
                    .hex()
                    .toString(),
                backgroundSize: '100%',
                transition: 'background 0s',
            },
        },
    ];

    const allTheColors = _(rippleBgColors)
        .flatMap((value, modifier) => {
            if (typeof value == 'object') {
                return _.map(value, (v, m) => {
                    return [`.${e(`ripple-bg-${modifier}-${m}`)}`, v];
                });
            }
            if (
                typeof value == 'string' &&
                value.length > 1
            ) {
                try {
                    Color(value)
                } catch (err) {
                    return [];
                }
                return [[`.${e(`ripple-bg-${modifier}`)}`, value]];
            }
        })
        .value();

    const components = _.fromPairs(
        _.map(allTheColors, color => {
            return returnColorPair(color);
        })
    );

    addComponents(components);
}