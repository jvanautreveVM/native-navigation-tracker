import { Component, createElement } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";

class NativeNavTrackerUnwrapped extends Component {
    constructor(props) {
        super(props);
        this.state = { shouldFireAction: false };
    }
    componentDidMount() {
        const { isFocused } = this.props;
        if (isFocused) {
            this.setState({
                shouldFireAction: true
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { isFocused } = this.props;
        if (prevProps.isFocused !== isFocused && isFocused) {
            this.setState({
                shouldFireAction: true
            });
        } else if (this.state.shouldFireAction) {
            this._tryFireAction();
        }
    }

    render() {
        return null;
    }

    _tryFireAction() {
        const { onFocusAction, pageNameAttr, routes } = this.props;
        if (
            onFocusAction &&
            onFocusAction.canExecute &&
            (!pageNameAttr || (pageNameAttr && pageNameAttr.status === "available"))
        ) {
            this.setState({
                shouldFireAction: false
            });
            if (pageNameAttr && routes) {
                //pageNameAttr.setValue(routes.params.title);
                pageNameAttr.setValue(routes.params.pageName);
              
            }
            onFocusAction.execute();
        }
    }
}

export function NativeNavTracker(props) {
    const isFocused = useIsFocused();
    //const navigationContxt = useContext(NavigationContext);
    const curRoute = useRoute();
    return <NativeNavTrackerUnwrapped {...props} isFocused={isFocused}  routes={curRoute} />;
}