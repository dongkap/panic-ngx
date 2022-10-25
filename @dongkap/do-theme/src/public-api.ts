/*
 * Public API Surface of do-theme
 */

export * from './lib/do-theme.module';

export { HeaderComponent } from './lib/components/header/header.component';
export { FooterComponent } from './lib/components/footer/footer.component';
export { SearchInputComponent } from './lib/components/search-input/search-input.component';

export { AnalyticsService } from './lib/services/analytics.service';
export { LayoutService } from './lib/services/layout.service';
export { SeoService } from './lib/services/seo.service';
export { StateService } from './lib/services/state.service';

export { DefaultLayoutComponent } from './lib/layouts/layout.component';
export { CapitalizePipe } from './lib/pipes/capitalize.pipe';
export { PluralPipe } from './lib/pipes/plural.pipe';
export { RoundPipe } from './lib/pipes/round.pipe';
export { TimingPipe } from './lib/pipes/timing.pipe';
export { NumberWithCommasPipe } from './lib/pipes/number-with-commas.pipe';

export { DEFAULT_THEME } from './lib/styles/theme.default';
export { COSMIC_THEME } from './lib/styles/theme.cosmic';
export { CORPORATE_THEME } from './lib/styles/theme.corporate';
export { DARK_THEME } from './lib/styles/theme.dark';
