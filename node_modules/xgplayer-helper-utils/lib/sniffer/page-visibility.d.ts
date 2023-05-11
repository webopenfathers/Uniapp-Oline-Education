export default PageVisibility;
declare class PageVisibility {
    callbacks: {
        onShow: any[];
        onHidden: any[];
    };
    handleVisibilityChange(): void;
    init(): void;
    destroy(): void;
}
