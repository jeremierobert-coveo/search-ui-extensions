import { Component, ComponentOptions, IComponentBindings, Initialization, l, IQueryResult } from 'coveo-search-ui';
import { user } from '../../utils/icons';
import './Strings';

/**
 * The options for the ViewedByCustomerComponent
 */
export interface IViewedByCustomerOptions {
    /**
     * If true, will display an icon when the component is displayed itself.
     */
    showIcon?: boolean;
    /**
     * The label that should be displayed when the component is displayed.
     */
    label?: string;
}

/**
 * Result component indicating if a search result have been viewed by the targeted user.
 */
export class ViewedByCustomer extends Component {
    /**
     * Unique Identifier used by the Search-UI.
     */
    public static readonly ID = 'ViewedByCustomer';

    /**
     * Default options used by the component.
     */
    public static readonly options: IViewedByCustomerOptions = {
        showIcon: ComponentOptions.buildBooleanOption({ defaultValue: true }),
        label: ComponentOptions.buildStringOption({ defaultValue: l(`${ViewedByCustomer.ID}_DefaultLabel`) })
    };

    // Internal CSS selectors.
    private static readonly ICON_CLASS = 'viewed-by-customer-icon';
    private static readonly LABEL_CLASS = 'viewed-by-customer-label';

    /**
     * Create an instance of {@link ViewedByCustomer}.
     * @param element Element on which to bind the component.
     * @param options Initialization options of the component.
     * @param bindings Bindings of the Search-UI environment.
     */
    public constructor(
        public element: HTMLElement,
        public options: IViewedByCustomerOptions,
        public bindings: IComponentBindings,
        result?: IQueryResult
    ) {
        super(element, ViewedByCustomer.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ViewedByCustomer, options);
        result = result ? result : this.resolveResult();
        if (!result) {
            throw new Error('No result found on result component ViewedByCustomer.');
        }
        if (result.isUserActionView) {
            this.render();
        }
    }

    private render() {
        if (this.options.showIcon) {
            const iconElement = document.createElement('span');
            iconElement.classList.add(ViewedByCustomer.ICON_CLASS);
            iconElement.innerHTML = user;
            this.element.appendChild(iconElement);
        }

        const labelElement = document.createElement('span');
        labelElement.classList.add(ViewedByCustomer.LABEL_CLASS);
        labelElement.innerText = this.options.label;
        this.element.appendChild(labelElement);
    }
}

Initialization.registerAutoCreateComponent(ViewedByCustomer);
