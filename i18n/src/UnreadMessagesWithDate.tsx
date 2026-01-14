import { useEffect, useMemo, useState } from 'react';
import { IntlProvider, FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

export default function UnreadMessagesWithDate() {
    const [n, setN] = useState(1);
    const [dt, setDt] = useState(new Date());

    useEffect(() => {
        setN(Math.floor(Math.random() * 10) + 1);
        setDt(new Date());
    }, []);

    const messages = useMemo(
        () => ({
            unread: 'У вас {n} {n, plural, one {непрочитанное сообщение} few {непрочитанных сообщения} many {непрочитанных сообщений} other {непрочитанных сообщений}}',
        }),
        []
    );

    return (
        <IntlProvider locale="ru" messages={messages}>
            <div style={{ fontSize: 16, color: 'black' }}>
                <FormattedMessage id="unread" values={{ n }} /> (
                <FormattedDate value={dt} day="2-digit" month="short" />{' '}
                <FormattedTime value={dt} hour="2-digit" minute="2-digit" second="2-digit" hour12={false} />)
            </div>
        </IntlProvider>
    );
}