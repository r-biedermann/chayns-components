import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WaitCursor from './WaitCursor';
import LoadMore from './LoadMore';
import PersonFinderResultItemCustom from './PersonFinderResultItemCustom';
import { PERSON_RELATION } from '../constants/relationTypes';

const ResultItemListCustom = ({
    className,
    data,
    hasMore,
    orm,
    showWaitCursor,
    onLoadMore,
    onClick,
}) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className={classnames('cc__person-finder__results-list', className)}>
            {data.map(relation => (
                <PersonFinderResultItemCustom
                    key={relation[orm.identifier] || relation.personId || relation.siteId}
                    data={relation}
                    orm={orm}
                    onClick={onClick}
                />
            ))}
            {hasMore && showWaitCursor && (
                <WaitCursor
                    style={{
                        padding: '24px 0',
                    }}
                    key={`${PERSON_RELATION}-wait`}
                />
            )}
            {onLoadMore && hasMore && (
                <LoadMore
                    key={`${PERSON_RELATION}-more`}
                    type={PERSON_RELATION}
                    hide={showWaitCursor}
                    onClick={onLoadMore}
                />
            )}
        </div>
    );
};

ResultItemListCustom.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    onLoadMore: PropTypes.func,
    showWaitCursor: PropTypes.bool,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

ResultItemListCustom.defaultProps = {
    data: [],
    showWaitCursor: false,
    hasMore: false,
    onClick: null,
    onLoadMore: null,
    className: null,
};

export default ResultItemListCustom;