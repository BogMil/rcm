export const shouldRenderNumberOfTimesWithCssClass = (numberOfTimes: number, className: string, renderComponent: any) => {
    renderComponent();
    let x = document.body.querySelectorAll(`.${className}`)
    expect(x.length).toBe(numberOfTimes)
}
